import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Button, Col } from "react-bootstrap";
import { fontGrid } from '@mui/material/styles/cssUtils';
import styled from 'styled-components';
import GeneralButton from '../components/button';
import { stepButtonClasses } from '@mui/material';

const Home: NextPage = () => {
    return (
        <div>
            <Image src = {'/commutio.png'} width = {240} height = {250} style = {{marginTop: "200px"}}/> 
            <div>      
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