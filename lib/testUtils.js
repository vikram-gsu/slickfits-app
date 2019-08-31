/* eslint-disable import/no-extraneous-dependencies */
import casual from 'casual';

casual.seed(777);

export const fakeItem = () => ({
    __typename: 'Item',
    id: '12321jlk', 
    title: 'Adidas shoes', 
    description: 'Yellow shoes with three stripes!', 
    price: 3450, 
    image: "adidas.jpg", 
    largeImage: "large_adidas.jpg" 
});

export const fakeUser = () => ({
    __typename: 'User',
    id: '23212',
    name: casual.name,
    email: casual.email,
    permissions: ['ADMIN']
})