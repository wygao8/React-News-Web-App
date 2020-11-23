import axios from "axios";

export default axios.create({
    baseURL: 'https://standardbingautosuggest.cognitiveservices.azure.com/bing/v7.0/suggestions',
    headers: {'Ocp-Apim-Subscription-Key': '33c7f9156f6c4752a8a875641efa5b58'}
});

//TODO: change to standard api before deploying
