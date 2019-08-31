import {shallow} from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import Item from '../components/Item';

const fakeItem = {
    id: '12321jlk', 
    title: 'Adidas shoes', 
    description: 'Yellow shoes with three stripes!', 
    price: 3450, 
    image: "adidas.jpg", 
    largeImage: "large_adidas.jpg" 
}
describe('<Item />', () => {
    it('renders and displays properly', () => {
        const wrapper = shallow(<Item {...fakeItem} />);

        expect(toJSON(wrapper)).toMatchSnapshot();
    })

    it('renders price as expected', () => {
        const wrapper = shallow(<Item {...fakeItem} />);
        
        const PriceTag = wrapper.find('PriceTag');
        expect(PriceTag.text()).toEqual('$34.50');
    })
    
    it('renders image as expected', () => {
        const wrapper = shallow(<Item {...fakeItem} />);
        const img = wrapper.find('img');
        const imgProps = img.props();
        expect(imgProps.src).toEqual(fakeItem.image);
        expect(imgProps.alt).toEqual(fakeItem.title);
    })
})
