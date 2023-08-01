import React, { useEffect } from "react";
import LoginForm from "../pages/Login/LoginForm";
import Substainale from "../pages/substainable/substain";
import Regional from "../pages/regional/regional";
import Facility from "../pages/facility/facility";
import Lanes from "../pages/lanes/lanes";
import LanesOverview from "../pages/lanes-overview/lanes-overview";
import Vendor from "../pages/vendor/vendor";
import RegionOverview from "../pages/region-overview/region-overview";
import FacilityOverview from "../pages/facility-overview/facility-overview";
import VendorOverview from "../pages/vendor-overview/vendor-overview";
import RegionalLevel from "../pages/regional-level/RegionalLevel";
import Error from "../pages/error/error";
import DecarbRecommended from "../pages/decarb-recommended/decarb-recommended";
import CarrierComparison from "../pages/carrier-comparison/carrierComparison";
import Decarb from "../pages/decarb/decarb";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute, { ProtectedRouteCheck } from "./ProtectedRoute";
import PrivateRoute from "./PrivateRoute";
import MyProject from "../pages/project";
import MyProjectDetail from "../pages/project-detail";
import BucketLogin from "../pages/Login/BucketLogin"
import Setting from "../pages/settings/setting";
import { useDispatch } from "react-redux";
import { userDetailsApi, } from "../component/store/auth/graph/graphDetailsSlice";


import {
  getFiltersDate,
} from "../component/store/auth/authDataSlice";

export default function GreenInsightRoute() {
  const dispatch = useDispatch();
  let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token
  useEffect(() => {
    if(tokenDetails1) {
      dispatch(getFiltersDate());
      dispatch(userDetailsApi());
  
    }
  }, [dispatch, tokenDetails1]);


  return (
    <Router basename="/">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ProtectedRouteCheck>
              <LoginForm />
            </ProtectedRouteCheck>
          }
        />
        <Route
          exact
          path="/bucket-login"
          element={
            <ProtectedRouteCheck>
              <BucketLogin />
            </ProtectedRouteCheck>
          }
        />

        <Route element={<ProtectedRoute />}>
          <Route path="/sustainable" element={<Substainale />} />
          <Route
            path="/regional/"
            element={
              <PrivateRoute roles={[0]}>
                <Regional />
              </PrivateRoute>
            }
          />
          {/* <Route path=":id" element={<Regional/>} /> */}
          {/* </Route> */}
          <Route path="/region-overview/:regionId/" element={<RegionOverview />} />

          <Route path="/regional-level" element={<RegionalLevel />} />
          {/* <Route path=":id" element={<RegionalLevel/>} /> */}
          {/* </Route> */}
          <Route path="/facility" element={<Facility />} />
          {/* <Route path=":id" element={<Facility/>} /> */}
          {/* </Route> */}
          <Route path="/carrier" element={<Vendor />} />
          {/* <Route path=":id" element={<Vendor/>} /> */}
          {/* </Route> */}
          <Route path="/lanes" element={<Lanes />} />
          <Route path="/lanes-overview/:laneName" element={<LanesOverview />} />
          {/* <Route path=":id" element={<Lanes/>} /> */}
          {/* </Route> */}
          <Route path="/facility-overview/:facilityId" element={<FacilityOverview />} />
          {/* <Route path="/carrier-overview" element={<VendorOverview />} /> */}
          <Route path="/carrier-overview/:id" element={<VendorOverview />} />
          <Route path="/carrier-overview/:id/:laneId" element={<VendorOverview />} />

          <Route path="/decarb" element={<Decarb />} />

          <Route path="/projects" element={<MyProject />} />
          <Route path="/project-detail/:id" element={<MyProjectDetail />} />

          <Route path="/decarb-recommended/:id" element={<DecarbRecommended />} />
          <Route path="/carrier-comparison" element={<CarrierComparison />} />

          <Route path="/settings" element={<Setting />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}
