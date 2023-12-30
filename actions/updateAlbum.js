"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function updateAlbum(data) {
  const prisma = new PrismaClient();
  const session = await getServerSession(authOptions);
  const uid = session?.user.id;
  const { aid, photos, albumName } = data;
  const res = await prisma.$transaction(async (prisma) => {
    let albumData = albumName ? { name: albumName } : {};

    if (photos) {
      // Insert photos
      const newPhotos = await prisma.photo.createMany(
        {
          data: photos.map((photo) => ({
            name: photo.name,
            aid,
            uid,
            aperture: parseFloat(photo.aperture),
            shutterspeed: photo.shutterspeed,
            iso: parseInt(photo.iso),
            description: photo.description || null,
            date: photo.date + "T12:30:45Z",
            pid: photo.fileId, // generated by b2
          })),
        },

        { timeout: 10000 }
      );

      if (!newPhotos || newPhotos.count === 0) {
        return { status: 400, message: "Unable to create photos" };
      }

      // Update thumbnail
      const thumbnail = await prisma.photo.findFirst({
        where: {
          aid,
          uid,
        },
      });

      if (!thumbnail) {
        return { status: 404, message: "Thumbnail not found" };
      }

      albumData = {
        ...albumData,
        thumbnail: {
          connect: {
            pid: thumbnail.pid,
          },
        },
      };
    }

    const updatedAlbum = await prisma.album.update({
      where: { aid_uid: { aid, uid } },
      data: albumData,
      include: {
        photos: true,
      },
    });
    if (!updatedAlbum) {
      return { status: 400, message: "Unable to update album " };
    }
    return { status: 200, message: "Success", data: updatedAlbum };
  });

  if (res.status === 200) {
    revalidatePath(`/album/${aid}`);
    redirect(`/album/${aid}`);
  } else {
    throw new Error("Unable to update album");
  }
}

export default updateAlbum;
