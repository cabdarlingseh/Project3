import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LaunchCardInfo from '../components/LaunchCardInfo';
import ExploreUniverse from '../components/ExploreUniverse';
import PictureOfTheDay from '../components/PictureOfTheDay';
import useSpaceData from '../hooks/UseDataFetcher';
import Lottie from "lottie-react";
import Loading_icon from '../assets/images/loading.json';
import Error_icon from '../assets/images/error_info.json';
import '../assets/styles/Dashboard.scss';

export default function Dashboard() {

    const { launches = [], picture, loading, error } = useSpaceData();


    // Loading  State

    if (loading) {
        return (
            <Container className='text-center py-5'>
                <Lottie
                    animationData={Loading_icon}
                    loop={true}
                    className="loading_icon"
                    aria-label='Loading animation'
                />

                <p className='mt-3'>Loading Data...</p>
            </Container>
        );
    }

    //Error State

    if (error) {
        return (
            <Container>
                <Lottie
                    animationData={Error_icon}
                    loop={true}
                    className="error_icon"
                    aria-label='Error animation' />

                <p className='mt-3 error_message'>Opps! Something went wrong:{error}</p>
            </Container>
        );
    }

    return (
        <Container fluid className='py-5 dashboard-container'>
            <Row>

                <Col md={6}>
                    <h2 className='mb-4 main_heading'>Upcoming Launches</h2>
                    {launches.length > 0 ? (
                        launches.slice(0, 5).map((launch) => (
                            <LaunchCardInfo key={launch.id} launch={launch} />
                        ))
                    ) : (
                        <p>No upcoming launches found.</p>
                    )}
                </Col>

                <Col md={6}>
                    <h2 className='mb-4 main_heading'>Astronomy picture of the day</h2>
                    <PictureOfTheDay picture={picture} loading={loading} error={error} />
                    <h2 className='mb-4 main_heading'>Explore the Universe</h2>
                    <ExploreUniverse />
                </Col>
            </Row>
        </Container>
    )
}