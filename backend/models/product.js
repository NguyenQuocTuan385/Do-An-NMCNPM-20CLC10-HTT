const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [100, 'Please name cannot exceed 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        maxLength: [9, 'Please price cannot exceed 9 characters'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'Please select category for this product'],
        enum: {
            values: [
                'Văn học',
                'Kinh tế',
                'Tâm lý - Kỹ năng sống',
                'Sách thiếu nhi',
                'Tiểu sử - Hồi ký',
                'Giáo Khoa - Sách tham khảo'
            ],
            message: 'Please select correct category for product'
        }
    },
    author: {
        type: String,
        required: [true, 'Please enter product author']
    },
    publishingCompany: {
        type: String,
        required: [true, 'Please enter product publishingCompany']
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        maxLength: [10, 'Please price cannot exceed 10 characters'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: Number,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Product", productSchema)