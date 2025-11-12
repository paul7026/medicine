import logo from './images/login_img.png'

import styles from './LoginPage.module.scss'

const LoginPage = () => {
  return (
    <div className={styles.loginPage}>
      <header className={styles.loginHeader} />
      <div className={styles.loginMain}>
        {/* <LoginForm /> */}

        <div className={styles.loginImg}>
          <img alt="veil" src={logo} />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
