import counterReducer from './counterReducer'
import userReducer from './userReducer'
import {combineReducers} from 'redux'
import hotelReducer from './hotelsReducer'
import optionsTabbarReducer from './optionsTabbarReducer'
import detailHotel from './detailHotel'
import roomDetailReducer from './roomDetailReducer'
import mostVisitedReducer from './mostVisitedReducer'
import popularLocation from './popularLocation'
import transactionReducer from './transactionReducer'
import transactionIdReducer from './transactionsIdReducer'
import transactionFailed from './transactionsFailed'
import BookReducer from './BookReducer'

const rootReducer = combineReducers({
    user : userReducer,
    counter : counterReducer,
    hotels : hotelReducer,
    option : optionsTabbarReducer,
    detailHotel : detailHotel,
    roomDetail : roomDetailReducer,
    mostVisited : mostVisitedReducer,
    location : popularLocation,
    transaction : transactionReducer,
    trxById : transactionIdReducer,
    trxFailed : transactionFailed,
    bookTrx : BookReducer
})

export default rootReducer