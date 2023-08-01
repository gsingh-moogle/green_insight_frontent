import { configureStore } from '@reduxjs/toolkit'
import graphDetailsReducer from "./auth/graph/graphDetailsSlice"
import authDataReducer from "./auth/authDataSlice"
import regionDetailsReducer from './region/regionDetailsSlice';
import facilityDetailsReducer from './facilty/facilityDetailsSlice';
import laneDetailsReducer from './lane/laneDetailsSlice';
import vendorDetailsReducer from './vendor/vendorDetailsSlice';
import regionOverviewReducer from "./region/regionOverviewSlice"
import decarbDetailsReducer from "./decarb/decarbSlice"
import projectReducer from "./project/projectSlice"
import dashReducer from './dashboard/dashSlice';

const store = configureStore({
  reducer: {
    graphDetails: graphDetailsReducer,
    auth: authDataReducer,
    region: regionDetailsReducer,
    facility: facilityDetailsReducer,
    lane: laneDetailsReducer,
    vendor: vendorDetailsReducer,
    regionOverview: regionOverviewReducer,
    decarb: decarbDetailsReducer,
    project: projectReducer,
    dash:dashReducer
  },
})


export default store;