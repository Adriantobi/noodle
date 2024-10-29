import AudioItem from "./components/audio-item";
import Widget, { WidgetProps } from "../widget";

export default function SoundBoardWidget({
  display,
  widgetState,
  defaultHeight,
}: WidgetProps) {
  return (
    <>
      <Widget
        title="Sounds"
        header="Soundboard"
        resize={true}
        widgetState={widgetState}
        display={display}
        defaultHeight={defaultHeight}
      >
        <div className="flex flex-col gap-[20px] p-[20px]">
          <AudioItem
            name="Cafe"
            source="https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-noise-creations/noisecreations_AMB-NCFREE02_London-Cafe-Small.mp3"
          />
          <AudioItem
            name="Lava"
            source="https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-14566/zapsplat_nature_lava_flow_17940.mp3"
          />
          <AudioItem
            name="Fire Place"
            source="https://soundbible.com/grab.php?id=2178&type=mp3"
          />
          <AudioItem
            name="Ocean"
            source="https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-one/water_ocean_waves_shore_calm_002.mp3"
          />
          <AudioItem
            name="Rain"
            source="https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-77317/zapsplat_nature_rain_rainstorm_heavy_blustery_wind_rain_drips_slowly_calming_down_drips_and_birds_towards_end_south_eastern_australia_80653.mp3"
          />
        </div>
      </Widget>
    </>
  );
}
