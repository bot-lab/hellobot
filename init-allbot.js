
module["exports"] = {
    baseURL: "https://yoururl",
    endpointURL:"/allbot",
    webhookReceiverURL: "/webhook",
    fileSenderURL: "/file",
    downloadPath: "./downloads",
    loglevel:"debug",
    service : [
    {
        identifier:'facebook-1',
        provider:"facebook",
        config:{
            verifyToken: '',
            accessToken: '',
            pageId:'',
            replyToBot: false 
        }
    }]
  }