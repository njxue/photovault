const PhotoSettingsInputs = ({ photo }) => {
  return (
    <div className="text-xs flex flex-col gap-1 px-1">
      <p className="mb-2 line text-sm text-start">{photo.name}</p>
      <div className="flex flex-rows items-center justify-between gap-2">
        <label>
          <img src="/assets/icons/aperture-black.svg" width={20} />
        </label>
        <input
          className="border border-solid border-gray-600 rounded p-1 grow md:max-w-[80%]"
          type="number"
          name="aperture"
          step={0.1}
          min={0}
          defaultValue={photo.aperture}
          placeholder="Aperture"
        />
      </div>
      <div className="flex flex-rows items-center justify-between gap-2">
        <label>
          <img src="/assets/icons/shutterspeed-black.svg" width={20} />
        </label>
        <input
          className="border border-solid border-gray-600 rounded p-1 grow md:max-w-[80%]"
          type="text"
          name="shutterspeed"
          defaultValue={photo.shutterspeed}
          placeholder="Shutter Speed"
        />
      </div>
      <div className="flex flex-rows items-center justify-between gap-2">
        <label>
          <img src="/assets/icons/iso-black.svg" width={20} />
        </label>
        <input
          className="border border-solid border-gray-600 rounded p-1 grow md:max-w-[80%]"
          type="number"
          name="iso"
          min={0}
          defaultValue={photo.iso}
          placeholder="ISO"
        />
      </div>
    </div>
  );
};

export default PhotoSettingsInputs;
