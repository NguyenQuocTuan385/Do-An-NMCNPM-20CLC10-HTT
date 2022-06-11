class APIFeatures {
    constructor(query,querystr){
        this.query=query;
        this.querystr=querystr;
    }

    search(){
        const keyword = this.querystr.keyword ? {
            name:{
                $regex: this.querystr.keyword,
                $options: 'i'
            }
        } : {}

        console.log(keyword);
        
        this.query = this.query.find({ ...keyword });
        return this;
    }
    filter(){
        const queryCopy = { ...this.querystr};
        
        console.log(queryCopy);
        //Removing fields from the query
        const removeFields = ['keyword','limit', 'page']
        removeFields.forEach(el => delete queryCopy[el]);
       

        console.log(queryCopy);

        //advance filter for price,etc
        let querystr = JSON.stringify(queryCopy)
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

        console.log(queryCopy);

        this.query = this.query.find(JSON.parse(querystr));
        return this;
    }
    
}

module.exports = APIFeatures