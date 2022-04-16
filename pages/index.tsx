import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Button, Col } from "react-bootstrap";
import { fontGrid } from '@mui/material/styles/cssUtils';
import styled from 'styled-components';
import StepButton from '../components/step-button';
import GeneralButton from '../components/button';
import { stepButtonClasses } from '@mui/material';

import { addUser, checkLogin } from '../firebase';

// addUser("shlokj@g.ucla.edu","password");
checkLogin("shlokj@g.ucla.edu","password");

const Home: NextPage = () => {
  return (
      <div>
          <div >
              <h1 style = {{
                  paddingTop: "",
                  fontSize: "",
                  color: "",
                  fontWeight: "",
                  fontFamily: '',
              }}>
              </h1>

              <Col>
                  <div>
                      <GeneralButton name = "Sign In" href = '/login'/>
                  </div>
                  <div>
                      <GeneralButton name = "Sign Up" href = '/signup'/>
                  </div>
              </Col>

          </div>
      </div>
  )
}

export default Home;