import React from 'react';
import {render} from '@testing-library/react-native'
import Restaurant from '../Restaurant';
it ("renders default elements",()=>{
    
    const {getAllByText , getAllByPlaceholderText} = render(<Restaurant/>);
    expect (getAllByText("Login").length).toBe(2);
    getAllByPlaceholderText("Enter email");
    getAllByPlaceholderText("Enter password");
});