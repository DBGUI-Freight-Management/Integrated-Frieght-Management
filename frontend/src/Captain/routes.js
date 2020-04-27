import { CaptainDash } from "./CaptainDash"
import React from 'react';
export const captainDashRoutes = [
    {path:"/dashboard/captain/logs", render:(props)=><CaptainDash mode="logs"/>},
    {path:"/dashboard/captain/status", render:(props)=><CaptainDash mode="status"/>},
    {path:"/dashboard/captain/crew", render:(props)=><CaptainDash mode="crew"/>},
    {path:"/dashboard/captain/cargo", render:(props)=><CaptainDash mode="cargo"/>},
    {path:"/dashboard/captain/route", render:(props)=><CaptainDash mode="route"/>},
    {path:"/dashboard/captain/updateInfo", render:(props)=><CaptainDash mode="updateInfo"/>},
]