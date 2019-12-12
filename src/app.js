const path=require('path');
const geoFunc=require('./utils/geocode');
const express=require('express');

const hbs=require('hbs');

// Joining the paths
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath=path.join(__dirname,'../templates/views');
const partialPath=path.join(__dirname,'../templates/partials')
const app=express()

// set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPath);


app.use(express.static(publicDirectoryPath));
app.get('',(req,res)=>{
    res.render('index',{
        title:'weather app',
        name: 'jaskaran batra'
    })

})

app.get('/about',(req,res)=>{
    res.render('about',{
        name:'Jaskaran',
        title:'About Me'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'It is the help page',
        name:'jaskaran batra'
    })
})



app.get('/weather',(req,res)=>{
    // console.log(req.query.address)
    if(!req.query.address){
       return res.send({
            error:"City is not defined"
        })
    }
    else{
    geoFunc.geocode(req.query.address,(error,dataL)=>{
        if(error)
        {
            return res.send({error});
        }
        else{
            geoFunc.forecast(dataL,(error,data)=>{
                
                if(error){
                    console.log(dataL);
                   return res.send({error:error});
                }
                else{
                   return res.send({
                        location:dataL.location,
                        temperature: data.temperature,
                        RainProbability: data.rainProbab,
                        summary:data.summary
                    });
                }
            })
        }
    })
}

})

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:"product is not defined"
        })
    }
    res.send({
        'products':[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        errorMessage:"The help article doesn't exist"
    })
})
app.get('*',(req,res)=>{
    res.render('404', {
        errorMessage:'sorry this page is not founded'
    });
})

app.listen(3000,()=>{
    console.log('Server is running on 3000');
})