const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
var app = express()
const cors = require('cors')
app.use(cors({ origin: "*" }))
app.use(bodyParser.json())
const fs = require('fs');
const contents = fs.readFileSync('./server.js', { encoding: 'base64' });
console.log(contents);
let token = "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";
let user = "sameer227"
//list all repo's


app.post('/list', async (req, res) => {

    await axios.get(`https://api.github.com/users/${user}/repos`, { data: "data" }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(resp => {
        console.log(resp);
        res.send(resp.data);
    })
})

app.post('/repo/create', async (req, res) => {

    await axios.post(`https://api.github.com/user/repos`, { name: req.body.name }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(resp => {
        console.log(resp);
        res.send(resp.data)
    })
})

app.post('/update/repo', async (req, res) => {

    await axios.get(`https://api.github.com/repos/${user}/post/contents/folder/server.js`, { name: req.body.name }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((shaRes) => {
        axios.put(`https://api.github.com/repos/${user}/PostManTest/contents/folder/server.js`, {
            owner: user,
            repo: 'post',
            path: 'folder/server.js',
            "sha": shaRes.sha,
            message: "test1",
            committer: {
                name: "sameer Soni",
                email: "sameer.soni9227@gmail.com"
            },
            "content": contents,
            "branch": "master"
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    })

        .then(resp => {
            console.log(resp);
            // res.send(resp.data)
        }).catch(error => {
            console.log(error);
        })
})


// axios.put(`https://api.github.com/repos/${user}/PostManTest/contents/folder/server.js`, {
//     owner: user,
//     repo: 'post',
//     path: 'folder/server.js',
//     "sha": "ad1c60ed0abce585160c77d6410db6896db1693f",
//     message: "test1",
//     committer: {
//         name: "sameer Soni",
//         email: "sameer.soni9227@gmail.com"
//     },
//     "content": contents,
//     "branch": "master"
// }, {
//     headers: {
//         Authorization: `Bearer ${token}`
//     }
// }).then(resp => {
//     console.log(resp);
//     // res.send(resp.data)
// }).catch(error => {
//     console.log(error);
// })

// axios.patch(`https://api.github.com/repos/${user}/PostManTest`, {
//     owner: user,
//     repo: 'PostManTest',
//     path: 'folder/server.js',
//     //message: "test1",
//     name: "post",
//     // committer: {
//     //     name: "sameer Soni",
//     //     email: "sameer.soni9227@gmail.com"
//     // },
//     "content": contents,
//     "branch": "master"
// }, {
//     headers: {
//         Authorization: `Bearer ${token}`
//     }
// }).then(resp => {
//     console.log(resp);
//     // res.send(resp.data)
// }).catch((error) => {
//     console.log(error);
// })

axios.get(`https://api.github.com/repos/${user}/post/contents/folder/server.js`, { name: "server.js" }, {
    headers: {
        Authorization: `Bearer ${token}`
    }
}).then((shaRes) => {
    console.log(shaRes.data);
    axios.put(`https://api.github.com/repos/${user}/post/contents/folder/server.js`, {
        owner: user,
        repo: 'post',
        path: 'folder/server.js',
        "sha": shaRes.data.sha,
        message: "test1",
        committer: {
            name: "sameer Soni",
            email: "sameer.soni9227@gmail.com"
        },
        "content": contents,
        "branch": "master"
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}).catch((err) => {
    console.log(err);
})



app.listen(5000, console.log("server is running"));