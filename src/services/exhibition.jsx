import axios from 'axios';
const baseUrl = 'https://api.artic.edu/api/v1/exhibitions';
export const exhibitionService={
    getExhibitionList
};
async function getExhibitionList(param){
    const response = await axios.get(`${baseUrl}?fields=id,title,is_featured,description,gallery_title,type&page=${param.page}&limit=${param.limit}`);
    return response;
}
