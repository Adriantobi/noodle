import styles from '../css/soundboardwidget.module.css'
import AudioComponent from './AudioComponent'
import Widget from './Widget'

export default function SoundBoardWidget() {
    return(
        <Widget name='Soundboard' header='Soundboard' resize={true}>
            <div className={styles.soundItems}>
                <AudioComponent name='Cafe' id='Cafe' source='https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-noise-creations/noisecreations_AMB-NCFREE02_London-Cafe-Small.mp3' />
                <AudioComponent name='Lava' id='Lava' source='https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-14566/zapsplat_nature_lava_flow_17940.mp3' />
                <AudioComponent name='Fire Place' id='Fire_Place' source='https://soundbible.com/grab.php?id=2178&type=mp3' />
                <AudioComponent name='Ocean' id='Ocean' source='https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-one/water_ocean_waves_shore_calm_002.mp3' />
                <AudioComponent name='Rain' id='Rain' source='https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-77317/zapsplat_nature_rain_rainstorm_heavy_blustery_wind_rain_drips_slowly_calming_down_drips_and_birds_towards_end_south_eastern_australia_80653.mp3' />
            </div>
        </Widget>
    )
}