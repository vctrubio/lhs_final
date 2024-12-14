import Link from 'next/link'
import styles from './LogoAnimation.module.css'


const LogoHeader = () => {
    return (
        <div className={styles.logoWrapper}>
            <Link href="/" className={styles.logoLink}>
                <div className={styles.logoText}>
                    <span className={styles.letter}>L</span>
                    <span className={styles.letter}>H</span>
                    <span className={styles.letter}>S</span>
                </div>
            </Link>
        </div>
    )
}
export default function PropertyLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col justify-center items-center">
            {/* <LogoHeader /> */}
            <div>
                {children}
            </div>
        </div>
    )
}
