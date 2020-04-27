import React from 'react'
import { ShippingManagerPage } from "./ShippingManagerPage"
import { ShipPage } from "./ShipPage"

export const FreightManagerRoutes = [
    {path: "/dashboard/freightmanager/companycreation", render:()=><ShippingManagerPage mode="Shipping Company Creation"/>},
    {path: "/dashboard/freightmanager/trackingpage", render:()=><ShippingManagerPage mode="Tracking Page" /> },
    {path: "/dashboard/freightmanager/shiplist", render:()=><ShippingManagerPage mode="Ship List"/>},
    {path: "/dashboard/freightmanager/activeships", render:()=><ShippingManagerPage mode="Active Ships" /> },
    {path: "/dashboard/freightmanager/updateshipstatus", render:()=><ShippingManagerPage mode="Update Ship Status" />},
    {path: "/freightmanager/shippage/:shipID", component: ShipPage}
]
