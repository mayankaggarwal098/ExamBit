import * as question from  '../constants/questionConstant'

export const createQuestionReducer = ( state = {}, action ) => {

    switch( action.type ) {

        case question.QUESTION_CREATE_REQUEST:
            return { loading: true };
        case question.QUESTION_CREATE_SUCCESS:
            return { loading: false, success:true };
        case question.QUESTION_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case question.QUESTION_CREATE_RESET:
            return { success: false };
        default: 
            return state;
    }
}

export const questionListReducer = ( state = {}, action ) => {

    switch( action.type ) {
        case question.QUESTION_LIST_REQUEST:
            return { laoding: true }
        case question.QUESTION_LIST_SUCCESS:
            return { loading: false, questions: action.payload }
        case question.QUESTION_LIST_FAIL:
            return { loading: false, error : action.payload};
        default:
            return state;
    }
}

export const questionDeleteReducer = ( state ={}, action ) => {

    switch( action.type ) {
        case question.QUESTION_DELETE_REQUEST:
            return { loading: true };
        case question.QUESTION_DELETE_SUCCESS:
            return { loading: false, success: true };
        case question.QUESTION_DELETE_FAIL:
            return { loading: false, error: action.payload };
        case question.QUESTION_DELETE_RESET:
            return {}
        default:
            return state;
    }
}