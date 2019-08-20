// Test away!

import React from 'react';
import Display from './Display';
import * as rtl from '@testing-library/react';
import 'jest-dom/extend-expect';

afterEach(rtl.cleanup);

describe('testing Display component', () => {
    it('shows the display componenet', () => {
        let wrapper = rtl.render(<Display />);
        rtl.cleanup();
    })
    it('displays Locked when the locked prop is true and Unlocked otherwise', () => {
        let wrapper = rtl.render(<Display closed={true} locked={true} />);
        const lockedClass1 = wrapper.getByTestId('lockedClass').textContent;
        expect(lockedClass1).toBe("Locked");
        rtl.cleanup();
        wrapper = rtl.render(<Display closed={true} locked={false} />);
        const lockedClass2 = wrapper.getByTestId('lockedClass').textContent;
        expect(lockedClass2).toBe("Unlocked");
    })

    it("when locked or closed use the red-led class", () => {
        const wrapper = rtl.render(<Display closed={true} locked={true} />);
        const lockedClass = wrapper.getByTestId('lockedClass');
        const closedClass = wrapper.getByTestId('closedClass');
        expect(lockedClass.classList[1]).toBe("red-led")
        expect(closedClass.classList[1]).toBe("red-led")
    })

    it('displays Closed when the closed prop is true and Open otherwise', () => {
        let wrapper = rtl.render(<Display closed={true} locked={true} />);
        const closedClass1 = wrapper.getByTestId('closedClass').textContent;
        expect(closedClass1).toBe("Closed");
        rtl.cleanup();
        wrapper = rtl.render(<Display closed={false} locked={false} />);
        const closedClass2 = wrapper.getByTestId('closedClass').textContent;
        expect(closedClass2).toBe("Open");
    })

    it("when unlocked or open use the green-led class", () => {
        const wrapper = rtl.render(<Display closed={false} locked={false} />);
        const lockedClass = wrapper.getByTestId('lockedClass');
        const closedClass = wrapper.getByTestId('closedClass');
        expect(lockedClass.classList[1]).toBe("green-led");
        expect(closedClass.classList[1]).toBe("green-led");

    })
})
