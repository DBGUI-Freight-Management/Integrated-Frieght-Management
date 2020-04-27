import React from 'react'
import { ShippingManagerPage } from "./ShippingManagerPage"
import { ShipPage } from "./ShipPage"

export const FreightManagerRoutes = [
    {path: "/dashboard/freightmanager/companycreation", render:()=><ShippingManagerPage mode="companycreation"/>},
    {path: "/dashboard/freightmanager/createroute", render:()=><ShippingManagerPage mode="createroute" />},
    {path: "/dashboard/freightmanager/trackingpage", render:()=><ShippingManagerPage mode="trackingpage" /> },
    {path: "/dashboard/freightmanager/shiplist", render:()=><ShippingManagerPage mode="shiplist"/>},
    {path: "/dashboard/freightmanager/activeships", render:()=><ShippingManagerPage mode="activeships" /> },
    {path: "/dashboard/freightmanager/updateshipstatus", render:()=><ShippingManagerPage mode="updateshipstatus" />},
    {path: "/freightmanager/shippage/:shipID", component: ShipPage}
]
