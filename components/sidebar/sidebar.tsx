import styles from './sidebar.module.css'

export default function Sidebar() {
    return (
        <div className={styles["floating-nav"]}>               
            {/* BRAND */}
            <div className={`${styles['brand-nav']} ${styles['flex-col']}`}> 
                <a className={`${styles['brand-logo']} ${styles['circle']}`} href='/'>M</a>
                <div className={`${styles['upper-case']} ${styles['no-wrap']} ${styles['vertical-text']}`}>Mountain Film </div>
            </div>  

            {/* SOCIAL */}
            <div className={`${styles['social-nav']}`}>
                {/* <div className='flex flex-col'> */}
                    <span>f</span>
                    <span>i</span>
                    <span>v</span>
                {/* </div> */}
            </div>
        </div>
    );

}