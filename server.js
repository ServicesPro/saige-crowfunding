const express = require('express');
const nodemailer = require('nodemailer');
const xauth2 = require('xoauth2');
const cors = require('cors');
const path = require('path');
const crypto = require('crypto'); 



const firebase = require('firebase/app');
firebase.initializeApp(  
    {
        apiKey: "AIzaSyCEIFq0iK6iMhS85FVRuHuJBLKK3cp16cA",
        authDomain: "saige-crowfunding-site.firebaseapp.com",
        databaseURL: "https://saige-crowfunding-site.firebaseio.com",
        projectId: "saige-crowfunding-site",
        storageBucket: "saige-crowfunding-site.appspot.com",
        messagingSenderId: "850254650720",
        appId: "1:850254650720:web:5b4f6252109ff74576d205",
        measurementId: "G-KTYLX7MPP9"
      }
 );

require('firebase/firestore');
const db = firebase.firestore();

const admin = require('firebase-admin');




const app = express();









/* START deploying */
app.use(express.static(__dirname + '/dist/saige-crowfunding'));
app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname + '/dist/saige-crowfunding/index.html'));
});



app.use(cors());


/* END deploying */

app.use(express.static(__dirname + '/dist/saige-crowfunding'));
app.use(express.json());       // to support JSON-encoded bodies
app.use(require("body-parser").urlencoded({extended: false}));



const getNodemailerTransporter = () => {
    return nodemailer.createTransport(
        {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                user: 'xampydev@gmail.com',
                clientId: '790421151887-9qeoht5u5gd6a1ufrpi7n56th97kph14.apps.googleusercontent.com',
                clientSecret: 'kJuw2jkIZFiMvg3P1X8kIFV5',
                refreshToken: '1//04hxWEMfRsbcbCgYIARAAGAQSNwF-L9IrKVfuPnBugkT9Nofn9V06tuVxXeBawUGdQmQNHgqko_GeyQB0mFQlXTXp_7JA5HaVGBk'
            }
        }
    );
}




app.post('/notify-new-project', function(req,res) {

    //Get parameters
    let user_email = req.body.email;
    let data = req.body.data;

    

    const mailTransporter = getNodemailerTransporter()

    let done_state = true;



    let mailDetails = { 
        from: 'admin@saige-crowfunding.com', 
        to: user_email, 
        subject: 'New Project created', 
        text: `\nSAIGE NEW PROJECT 
                \n\nYour project ${data.project_name} has been created with success.
                \n\nGot to Your dashboard to things up.
                \n\nhttp://www.saige-financialplateform.com//dashboard
                \n\n Saige team.`
    };

    mailTransporter.sendMail(mailDetails, (err, data) => { 
        if(err) { 
            console.log('Error Occurs');
            console.log(err);
            done_state = false;
        } else { 
            console.log('Email sent successfully'); 
            
        } 
    }); 

    //Notify with email
    

    //console.log(req);

    res.json(
        {
            done_sate: done_state,
            message: ""
        }
    )
});









//[ START notiying with new Message ]


app.post('/notify-message', function(req,res) {

    //Get parameters
    let user_email = req.body.email;
    let data = req.body.data;

    

    const mailTransporter = getNodemailerTransporter()

    let done_state = true;



    let mailDetails = { 
        from: 'admin@saige-crowfunding.com', 
        to: user_email, 
        subject: "You've got message from saige admin", 
        text: `SAIGE NOTIFICATION
                \n\nPROJECT : ${data.project_name}
                \nGot to your dashboard in order check your project
                \n\n${data.message}
                
                \n\n\nhttp://www.saige-financialplateform.com//dashboard
                \n\n\nSaige Team`
    };

    mailTransporter.sendMail(mailDetails, (err, data) => { 
        if(err) { 
            console.log('Error Occurs');
            console.log(err);
            done_state = false;
        } else { 
            console.log('Email sent successfully'); 
            
        } 
    }); 

    //Notify with email
    

    //console.log(req);

    res.json(
        {
            done_sate: done_state,
            message: ""
        }
    )
});


//[START] stripe payment checkout
const stripe = require('stripe')('sk_test_51HtWOeCU7mLHHV7kjocWiEdnpDzNqU1sGbRpwz3vuYW7HVxAj37APhUsvRZ8rB2lOLQZu85ozqBC0jIRcAY5AQMr00ipHggMqc');

app.post('/create-checkout-session', async (req, res) => {

    //Get data from request
    let user_email = req.body.email;
    let amount     = req.body.amount;
    let name       = req.body.name;
    let project    = req.body.project;
    let uid        = project.uid;

    //console.log(req.body);

    console.log(user_email, typeof amount, name, project);



    //Genrate hash here
    const hash_string = new Date() + " " + user_email
    + " " + amount + " " + " " + name  + " " + uid;

    const hash = crypto.createHash('sha1').update(hash_string).digest('hex');

    console.log(hash);

    //Create ransaction in database
    let create_transaction = new Promise(
        ( resolve, reject) => {
            db.collection('transactions').doc( hash ).set(
                {
                    project_uid: uid,
                    amount: amount,
                    name: name,
                    pname: project.name,
                    email: user_email,
                    img: project.img_url
        
                }
            ).then(
                () => {
                    resolve("done");
                }
            ).catch( (error) => {
                console.log(error);
            } );
    });

    let result = await create_transaction;

    if ( result == "done") {
        let success_url = 'http://www.saige-financialplateform.com/contribute/state-success/' + hash;


        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: user_email,
            line_items: [
            {
                price_data: {
                currency: 'usd',
                product_data: {
                    name: 'Saige-Crowfunding CONTRIBUTE',
                },
                unit_amount: parseInt(amount) * 100,
                },
                quantity: 1,
            },
            ],
            mode: 'payment',
            success_url: success_url,
            cancel_url: 'http://www.saige-financialplateform.com/contribute/state-cancelled',
        });

        //console.log(session);

        res.json({ id: session.id });
    }
    
});



/*[START] Payment success we save it to the database */
app.post('/checkout-success', cors(), async (req, res) => {


    let project_uid = req.body.project_uid;
    let amount     = req.body.amount;
    let transaction = req.body.transaction;

    //We save our contribution
    let result = await db.collection('contributions').doc(transaction + "_contribute").set(
        {
            project_uid: project_uid,
            amount: amount,
            transaction: transaction
        }
    );

    res.json({ result: "OK"} );

});

app.listen(process.env.PORT || 8080, () => {
    console.log("Server started...");
});


/*
app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname + '/dist/saige-crowfunding/index.html'));
});


app.listen(process.env.PORT || 3000 , () => {
    console.log("Server started...");
});*/