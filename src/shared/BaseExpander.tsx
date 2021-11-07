import React from 'react';
import { Collapse } from 'antd';
import { CaretRightFilled } from '@ant-design/icons';

interface BaseExpanderProps {
  title: string;
  children: React.ReactNode;
}

const { Panel } = Collapse;

function BaseExpander({ title, children }: BaseExpanderProps) {
  return (
    <div className="expander">
      <Collapse ghost className="expander" collapsible="header">
        <Panel
          key="default"
          header={
            <span className="expander__header">
              <CaretRightFilled className="expander__arrow" />
              <span>{title}</span>
            </span>
          }
          showArrow={false}
          className="expander__panel"
        >
          <div className="expander__content">{children}</div>
        </Panel>
      </Collapse>
    </div>
  );
}

export default BaseExpander;
