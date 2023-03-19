const { AccountService, InvalidRequestParameter } = require('../services')

const getMe = async (ctx)=>{
    const {
        headers: {
            userid,
            oauth_id,
            oauth_type,
        }
    } = ctx

    const inst = new AccountService()
    if(userid){
        ctx.body = await inst.getAccountByUserId(userid)
    }if(oauth_id && oauth_type){
        ctx.body = await inst.getAccountByOauthId(oauth_id, oauth_type)
        console.log('ctx : ', ctx.body)
    }else{
        throw new InvalidRequestParameter('oauth_id', 'oauth_type')
    }
    
    ctx.body.meta = {
        requestId: ctx.state.requestId,
        now: +new Date(),
    }
}

const joinMe = async (ctx)=>{
    const {
        query,
        headers,
    } = ctx
    const inst = new AccountService()
    inst.addNewAccount()
    ctx.body = {dummy:'joinMe'}
}

const updateMe = async (ctx)=>{
    const inst = new AccountService()
    inst.updateAccount()
    ctx.body = {dummy:'updateMe'}
}

const deleteMe = async (ctx)=>{
    const inst = new AccountService()
    inst.deleteAccount()
    ctx.body = {dummy:'deleteMe'}
}

module.exports = { 
    getMe,
    joinMe,
    updateMe,
    deleteMe
}