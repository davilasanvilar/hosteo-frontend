import logo from '/logo.svg';
import styles from './PublicFormLayout.module.css';
import { Fieldset } from '@mantine/core';
import { useScreen } from '../../../hooks/useScreen';

export function PublicFormLayout({
    children,
    onSubmit,
    title
}: {
    children: JSX.Element | JSX.Element[];
    onSubmit?: () => void;
    title?: string;
}) {
    const { isTablet } = useScreen();

    return (
        <section className={styles.container}>
            <div className={styles.logoSection}>
                <div className={styles.logoOverlay}>
                    <img src={logo} alt="Logo" className={styles.logo} />
                </div>
            </div>
            <div className={styles.contentSection}>
                <Fieldset legend={title} h={'100%'}>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            onSubmit && onSubmit();
                        }}
                        className={styles.form}
                    >
                        {children}
                    </form>
                </Fieldset>
            </div>
        </section>
    );
}
