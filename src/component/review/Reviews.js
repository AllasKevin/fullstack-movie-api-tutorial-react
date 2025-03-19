import React, { useEffect, useRef } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ReviewForm from '../reviewForm/ReviewForm';
import api from '../../api/axiosConfig';

const Reviews = ({getMovieData, movie, reviews, setReviews}) => {
    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    useEffect(() =>{
        getMovieData(movieId);
    }, [])

    const addReview = async (e) =>{
        e.preventDefault();

        const rev = revText.current;

        try
        {
            const response = await api.post("/reviews", {reviewBody: rev.value, imdbId: movieId});
            
            console.log("reviews:", reviews);

            const updateReviews = [...reviews, {body: rev.value}];

            rev.value = "";

            setReviews(updateReviews);
        }
        catch (err) 
        {
            console.error(err);
        }
    }


  return (
    <Container>
        <Row>
            <Col><h3>Reviews</h3></Col>
        </Row>
        <Row className='mt-2'>
            <Col>
                <img key={movie?.id}  src={movie?.poster} alt="" />
            </Col>
            <Col>
                {
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                }
                {
                    reviews?.map((r, index) => {
                        return(
                            <React.Fragment key={r.id+index}>
                                <Row key={"row1."+r.id}>
                                    <Col key={"col1."+r.id}>{r.body}</Col>
                                </Row>
                                <Row key={"row2."+r.id}>
                                    <Col key={"rcol2."+r.id}>
                                        <hr />
                                    </Col>
                                </Row>
                            </React.Fragment>
                        )
                    })
                }
            </Col>
        </Row>
        <Row>
            <Col>
                <hr />
            </Col>
        </Row>
    </Container>
  )
}

export default Reviews