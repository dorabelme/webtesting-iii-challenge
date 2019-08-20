// Test away!
import React from 'react';
import * as rtl from '@testing-library/react';
import 'jest-dom/extend-expect';
import Controls from "./Controls";

afterEach(rtl.cleanup);

describe('testing Dashboard component', () => {
    it("provide buttons to toggle the closed and locked states", async () => {
        const wrapper = rtl.render(<Controls locked={false} closed={false} />);
        let closeBtn = wrapper.getByTestId('toggle-closed');
        let lockBtn = wrapper.getByTestId('toggle-locked');
        expect(closeBtn).toBeDefined();
        expect(lockBtn).toBeDefined();
    })

    it("buttons' text changes to reflect the state", async () => {
        let wrapper = rtl.render(<Controls locked={false} closed={false} />);
        let closeBtn = wrapper.getByTestId('toggle-closed');
        let lockBtn = wrapper.getByTestId('toggle-locked');
        expect(closeBtn.textContent).toBe("Close Gate");
        expect(lockBtn.textContent).toBe("Lock Gate");
        await rtl.fireEvent.click(closeBtn);
        await rtl.fireEvent.click(lockBtn);
        rtl.cleanup();
        wrapper = rtl.render(<Controls locked={true} closed={true} />);
        closeBtn = wrapper.getByTestId('toggle-closed');
        lockBtn = wrapper.getByTestId('toggle-locked');
        expect(closeBtn.textContent).toBe("Open Gate");
        expect(lockBtn.textContent).toBe("Unlock Gate");
        await rtl.fireEvent.click(closeBtn);
        await rtl.fireEvent.click(lockBtn);
    })

    it("cannot be closed or opened if it is locked and cannot be locked if opened", async () => {
        let wrapper = rtl.render(<Controls locked={true} closed={true} />);
        let button = wrapper.getByTestId('toggle-closed');
        await rtl.fireEvent.click(button);
        expect(button.disabled).toBe(true);
        rtl.cleanup();
        wrapper = rtl.render(<Controls locked={false} closed={false} />);
        button = wrapper.getByTestId('toggle-locked');
        await rtl.fireEvent.click(button);
        expect(button.disabled).toBe(true);
    })
})