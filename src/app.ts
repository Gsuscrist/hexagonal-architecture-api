import express from 'express';
import {Signale} from 'signale';

import {userRoute} from "./user/Infrastructure/userRoute";
import {authRoute} from "./auth/infrastructure/authRoute";


const app = express();
const signale = new Signale();

app.use(express.json())

app.use('/user',userRoute);

app.use('/auth', authRoute)
app.listen(8080,()=>{
    signale.success("Server on line in port: 8080")
})