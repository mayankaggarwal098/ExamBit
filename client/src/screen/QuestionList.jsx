import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Row, Col, Button, Container, Modal, ListGroup } from 'react-bootstrap';
import { getAllQuestions } from '../actions/questionAction';
import { QUESTION_CREATE_RESET, QUESTION_DELETE_RESET } from '../constants/questionConstant'
import { deleteQuestion } from '../actions/questionAction';
import Loader  from '../component/Loader';

const QuestionList = ({history}) => {

    const [show, setShow] = useState(false);
    const [ pos, setIndex ] = useState(0);

    const handleClose = () => setShow(false);

    const { loading, questions } = useSelector( state => state.questionList )
    const { loading: loadingCreate, success: successCreate } = useSelector( state => state.createQuestion ); 

    const { loading: loadingDelete, success: successDelete } = useSelector( state => state.questionDelete )

    const dispatch = useDispatch();

    useEffect( () => {
        if( !questions || successDelete || successCreate ){
            dispatch(getAllQuestions());
            dispatch({ type: QUESTION_CREATE_RESET})
            dispatch({ type: QUESTION_DELETE_RESET});
        } 
    },[ successDelete, successCreate, questions, dispatch])

    const createHandler = () => {
        history.push('/questions/create')
    };

    const deleteHandler = (id) => {
        if( window.confirm("Are you sure ") ){
            dispatch(deleteQuestion(id));
        }
    }

    const set = (index) => {
        setShow(true);
        setIndex(index);
    }

    return (
        <>
        { loadingCreate && <Loader />}
        { loadingDelete && <Loader />}
        { loading && <Loader />}
        <Container>
        <Row className="align-items-center">
            <Col>
                <h3>All Questions</h3>
            </Col>
            <Col className="text-right">
                <Button className="my-3" onClick={createHandler}>
                    <i className="fas fa-plus"></i>&nbsp;&nbsp;Add New Question
                </Button>
            </Col>
        </Row>
        <Table hover bordered striped responsive className="table-lg">
            <thead>
                <tr>
                    <th>SUBJECT</th>
                    <th>QUESTION</th>
                    <th>WEIGHTAGE</th>
                    <th>&nbsp;&nbsp;ACTION&nbsp;&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                { questions && questions.map( (question, index ) => (
                    <tr key={question._id}>
                        <td>{question.subject}</td>
                        <td>{question.questionBody}</td>
                        <td>{question.weightage}</td>
                        <td>
                            <Button 
                                variant="primary" 
                                className="btn-sm"
                                onClick={ () => set(index)}><i className="fas fa-info-circle"></i>
                            </Button>
                            &nbsp;
                            <Button 
                                variant="primary" 
                                className="btn-sm"
                                onClick={ () => deleteHandler(question._id)}><i className="fas fa-trash"></i>
                            </Button>                        
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </Container>
        { questions && questions[pos] && (
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="my-modal"
                aria-labelledby="example-custom-modal-styling-title"
            >
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                QuestionID: {questions[pos]._id}
             </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ListGroup variant="flush">
                  <ListGroup.Item>
                      <strong><b>SUBJECT</b></strong> : { questions[pos].subject}
                  </ListGroup.Item>
                  <ListGroup.Item>
                      <strong><b>WEIGHTAGE</b></strong> : { questions[pos].weightage}
                  </ListGroup.Item>
                  <ListGroup.Item>
                      <strong><b>QUESTION</b></strong> : { questions[pos].questionBody}
                  </ListGroup.Item>
                  <ListGroup.Item>
                        { questions[pos].options.map((opt, index) => (
                            <>
                                <strong>{index+1}</strong>:{" "}{opt.optionBody}<br></br>
                            </>
                              
                        ))}
                  </ListGroup.Item>
                  <ListGroup.Item>
                      <strong><b>Answer:</b> </strong>
                        { questions[pos].options.map((opt, index) => (
                            <>
                                { opt.isAnswer && 
                                <>
                                    <strong>Option{index+1}</strong>:{" "}{opt.optionBody},&nbsp;
                                </>
                                }
                            </>
                              
                        ))}
                  </ListGroup.Item>
                  <ListGroup.Item>
                      <strong><b>EXPLANATION</b></strong> : { questions[pos].explanation}
                  </ListGroup.Item>
              </ListGroup>
            </Modal.Body>
          </Modal>
        )
        }
        </>
    )
}

export default QuestionList
