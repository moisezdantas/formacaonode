const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const paypal = require("paypal-rest-sdk");

// View engine
app.set("view engine", "ejs");

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AaeVYvVXQfVFg_ucXRQd8BqBuIyn4wu65a3hd_fYYY91OyyMysZrC3meLBKYFUI2qvrVj7tPOCMG7zP7",
  client_secret:
    "EOInCnCVplGwuEQPPnieuTf6s2ASpf1uPkNplFLDswaIYS-XrekxnZui6wCl_6xAobLCkyqBjJrCG0fP",
});

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/comprar", (req, res) => {
  const email = req.body.email;
  const id = req.body.id;
  const { name, price, amount } = req.body;

  const total = price * amount;

  var pagamento = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal",
    },
    "redirect_urls": {
      "return_url": `http://localhost:45567/final?email=${email}&id=${id}&total=${total}`,
      "cancel_url": "http://cancel.url",
    },
    "transactions": [
      {
        "item_list": {
          "items": [
            {
              "name": name,
              "sku": name,
              "price": price,
              "currency": "BRL",
              "quantity": amount,
            },
          ],
        },
        "amount": {
          "currency": "BRL",
          "total": total,
        },
        "description": "Essa é a melhor de todas.",
      }
    ]
  };

  paypal.payment.create(pagamento, (error, payment) => {
    if (error) {
      console.log(`Erro ao criar pagamento ${error}`);
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        const p = payment.links[i];

        if (p.rel === "approval_url") {
          res.redirect(p.href);
        }
      }
    }
  });
});

app.get("/final", (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const emailDoCliente = req.query.email;
  const id = req.query.id;
  const total = req.query.total;

  const final = {
    "payer_id": payerId,
    "transactions": [{
        "amount":{
            "currency": "BRL",
            "total": total
        }
    }]
 }

  paypal.payment.execute(paymentId, final, (error, payment) => {
    if (error) {
      console.log(`Erro ao finalizar ${error}`);
    } else {
      //criando regra
      console.log(`Pagamento id:${id}  email:${emailDoCliente}`);
      res.json(payment);
    }
  });
});

app.get("/create", (req, res) => {
  var plan = {
    "name": "Plano Prata",
    "description": "Um plano bem barato e muito bom",
    "merchant_preferences": {
      "auto_bill_amount": "yes",
      "cancel_url": "http://www.cancel.com",
      "initial_fail_amount_action": "continue",
      "max_fail_attempts": "1",
      "return_url": "http://www.success.com",
      "setup_fee": {
        "currency": "BRL",
        "value": "0",
      }
    },
    "payment_definitions": [
      {
        "amount": {
          "currency": "BRL",
          "value": "0",
        },
        "cycles": "7",
        "frequency": "DAY",
        "frequency_interval": "1",
        "name": "Teste gratis",
        "type": "TRIAL",
      },
      {
        "amount": {
          "currency": "BRL",
          "value": "24",
        },
        "cycles": "0",
        "frequency": "MONTH",
        "frequency_interval": "1",
        "name": "REGULAR PRATA",
        "type": "REGULAR",
      }
    ],
    "type": "INFINITE",
  };

  paypal.billingPlan.create(plan, (error, plan) => {
    if (error) {
      console.log(error);
    } else {
      console.log(plan);
      res.json(plan);
    }
  });
});

app.get("/list", (req, res) => {
  //Lista pode passar parametro para lista ou passa vazio para listar todos que precisa ser ativado
  paypal.billingPlan.list({ status: "ACTIVE" }, (error, plans) => {
    if (error) {
      console.log(error);
    } else {
      res.json(plans);
    }
  });
});

app.get("/active/:id", (req, res) => {
  const mudancas = [
    {
      op: "replace",
      path: "/",
      value: {
        state: "ACTIVE",
      },
    },
  ];

  paypal.billingPlan.update(req.params.id, mudancas, (error, result) => {
    res.send("mudança feita!");
  });
});

app.post("/sub", (req, res) => {
  const id = "P-8MV62371L6038141Y2BOE5TY";
  const email = req.body.email;

  var isoDate = new Date(Date.now());
  isoDate.setSeconds(isoDate.getSeconds() + 4);
  isoDate.toISOString().slice(0, 19) + "Z";

  var dadosAssinatura = {
    "name": "Assinatura do plano prata",
    "description": "Um plano bem barato e muito bom",
    "start_date": isoDate,
    "payer": {
      "payment_method": "paypal"
    },
    "plan": {
      "id":id
    },
    "override_merchant_preferences": {
      "return_url": `http://localhost:45567/subreturn?email=${email}`,
      "cancel_url": "https://example.com"
    }
  }

  paypal.billingAgreement.create(dadosAssinatura, (error, assinatura) => {
      if(error){
          console.log('Criando assinatura', error);
      }else{
           res.json(assinatura);
      }
  })

});

app.get('/subreturn', (req, res) => {
    const email = req.query.email;
    const token = req.query.token;
    
    paypal.billingAgreement.execute(token, {}, (error, assinatura) => {
        if(error){
            console.log(error);
        }else{
             res.json(assinatura);
        }
    })
});
//informacao do plano
app.get('/info/:id', (req, res) => {
    const id = req.params.id;

    paypal.billingAgreement.get(id,(error, assinatura) => {
        if(error) {
            console.log(error);
        }else{
            res.json(assinatura);
        }
    })
});
///cancelar plano
app.get('/cancel/:id', (req, res) => {
    const id = req.params.id;

    paypal.billingAgreement.cancel(id,{"note": "O cliente pediu para cancelar"}, (error, response) => {
        if(error) {
            console.log(error);
        }else{
            res.send("assinatura cancelada");
        }
    })
});

app.listen(45567, () => {
  console.log("Running!");
});
