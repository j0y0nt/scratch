import { app } from "./app";

const port =  process.env.PORT || 3000;

app.listen(port, () => 
    console.log(`Scratch app listening at http://localhost:${port}`)
);