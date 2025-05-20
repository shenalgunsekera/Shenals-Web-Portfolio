import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import headerImg from '../assets/img/header-img.svg';


export const Banner = () => {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const toRotate = [ "Full Stack Developer", "Web Developer", "Software Engineer" ];
    const [text, setText] = useState('');
    const period = 2000;
    const [delta, setDelta] = useState(300 - Math.random() * 300);

    const tick = useCallback(() => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        // if (isDeleting) {  
        //     setDelta(prevDelta => prevDelta / 2);
        // }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(200);
        } else {
        setDelta(200); // Keep typing/backspace speed fast and smooth
    }
    }, [isDeleting, loopNum, period, text, toRotate]);

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => { clearInterval(ticker) };
    }, [delta, tick]);

    return (
        <section className="banner" id="home">    
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} xl={7}>
                        <span className="tagline">Welcome to my Portfolio</span>
                        <h1>{`Hi I'm Shenal Gunasekera `} <br /> <span className="wrap">{text}</span></h1>
                        <p>I am a dedicated and results-driven student. With a robust commitment to achieving goals and a meticulous attention to detail, I bring a high level of professionalism and a strong work ethic to every task that comes my way. My ability to adapt to new challenges, coupled with a passion for continuous learning and improvement, enables me to deliver outstanding performance consistently. I am highly motivated to contribute to a dynamic team and am eager to leverage my skills and experiences through the knowledge imparted onto me by my seniors to drive success for my place of employment.</p>
                        <button onClick={() => console.log('connect')}>Let’s Connect <ArrowRightCircle size={25}/></button>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <img src={headerImg} alt="Header Img"/>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}