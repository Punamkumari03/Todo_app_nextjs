import { useRouter } from 'next/router'
import React from 'react'
import classes from './Header.module.css'
const Header = () => {
  const router = useRouter();
  
  const clickHandler= () => {
    router.push('/completed')
  }
  return (
    <header className={classes.header}>
      <nav onClick={() => router.push('/')}>To do App</nav>
      <p onClick={clickHandler}>Completed Todos</p>
    </header>
  )
}

export default Header