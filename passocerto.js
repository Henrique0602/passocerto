const mongoose=require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({extended : true}));
const port =3000;


mongoose.connect("mongodb://127.0.0.1:27017/passocerto",
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}); 


const UsuarioSchema = new  mongoose.Schema({

    email : {type : String, required:true},
    senha : {type : String}
});

const Usuario = mongoose.model("Usuario",UsuarioSchema);


app.post("/cadastrousuario" , async(req , res)=>{
   const email = req.body.email;
   const senha=req.body.senha

   const usuario = new Usuario({
        email : email,
        senha : senha
   })

   try{
    const newUsuario = await usuario.save();
    res.json({error : null, msg : "Cadastro ok ", UsuarioId : newUsuario._id});
   }catch (error) {}
});


const ProdutocalcadoSchema = new  mongoose.Schema({
     id_produtocalcado : {type : String},
     descricao : {type : String},
     marca : {type : String},
     Data_fabricação : {type : String},
     Quantidade_estoque : {type : Number}
    
});

const Produtocalcado = mongoose.model("Produtocalcado",ProdutocalcadoSchema)
app.post("/cadastroprodutocalcado" , async(req , res)=>{
    const id_produtocalcado = req.body.id_produtocalcado;
    const descricao = req.body.descricao;
    const marca = req.body.marca;
    const Data_fabricação = req.body.Data_fabricação;
    const Quantidade_estoque = req.body.Quantidade_estoque;
    
 
    const produtocalcado = new Produtocalcado ({
          id_produtocalcado : id_produtocalcado,
          descricao : descricao,
          marca : marca,
          Data_fabricação : Data_fabricação,
          Quantidade_estoque : Quantidade_estoque
    })

    try{
        const newProduto = await produtocalcado.save();
        res.json({error : null, msg : "Cadastro ok ", ProdutoId : newProduto._id});
    }catch (error) {}
 })
 
 
 
 

//rota de get de formulario

app.get("/cadastrousuario", async(req, res)=>{
    res.sendFile(__dirname + "/cadastrousuario.html")
  });
  
app.get("/", async(req, res)=>{
      res.sendFile(__dirname + "/index.html")
  });

app.get("/cadastroprodutocalcado", async(req,res)=>{
    res.sendFile(__dirname + "/cadastroprodutocalcado.html")
})

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`)
})







