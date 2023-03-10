
import style from './singleImageBannerPanel.module.css';

export default function SingleImageBannerPanel() {
    
    return (
        <div className={`${style['container']}`}>

            {/* Background */}
            <div className={`${style['image-wrapper']}`}></div>

            {/* Text Panel */}
            <div className={`${style['slider-container']}`}>
            </div>

            {/* Color Stripe */}
            <div className={`${style['color-stripe']}`}>
            </div>

        </div>
    );
}