import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TabsContainer = styled.div`
  display: flex;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
`;

const TabList = styled.ol`
  display: flex;
  flex-direction: column;
  width: auto; 
  padding:0px;
  margin: 0;
  border-right:white
  border-radius:2px solid black;
  background: #f9f9f9;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  gap:10px;
`;
const TabListItem = styled.li`
  list-style: none;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  border: 1px solid #ccc;

  /* make active tab border blend into content */
  border-right: ${({ active }) => (active ? "1px solid white" : "1px solid #ccc")};
  background-color: ${({ active }) => (active ? "white" : "#f9f9f9")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  border-radius: 8px 0 0 8px;
  transition: all 0.2s ease;

  /* create spacing and slight overlay when active */
  position: relative;
  z-index: ${({ active }) => (active ? "2" : "1")};
  right: ${({ active }) => (active ? "-2px" : "0")};

  margin-right: ${({ active }) => (active ? "0" : "6px")};

  &:hover {
    background-color: #f1f1f1;
  }
`;



const TabContent = styled.div`
  flex: 1;
  padding: 1.5rem;
  background-color: white;
  border-left: 1px solid #ccc;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;





// ===== Tab Component =====
class Tab extends Component {
    static propTypes = {
        activeTab: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    onClick = () => {
        const { label, onClick } = this.props;
        onClick(label);
    };

    render() {
        const {
            props: { activeTab, label },
        } = this;

        return (
            <TabListItem onClick={this.onClick} active={activeTab === label}>
                {label}
            </TabListItem>
        );
    }
}

// ===== Tabs Component =====
class Tabs extends Component {
    static propTypes = {
        children: PropTypes.instanceOf(Array).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            activeTab: this.props.children[0].props.label,
        };
    }

    onClickTabItem = (tab) => {
        this.setState({ activeTab: tab });
    };

    render() {
        const {
            onClickTabItem,
            props: { children },
            state: { activeTab },
        } = this;

        return (
            <TabsContainer>
                <TabList>
                    {children.map((child) => {
                        const { label } = child.props;
                        return (
                            <Tab
                                activeTab={activeTab}
                                key={label}
                                label={label}
                                onClick={onClickTabItem}
                            />
                        );
                    })}
                </TabList>
                <TabContent
                    activeTabIndex={children.findIndex(
                        (child) => child.props.label === activeTab
                    )}
                    tabCount={children.length}
                >
                    {children.map((child) => {
                        if (child.props.label !== activeTab) return undefined;
                        return child.props.children;
                    })}
                </TabContent>

            </TabsContainer>
        );
    }
}

// ===== App (Demo) =====
class App extends Component {
    render() {
        return (
            <div style={{ fontFamily: "Arial, sans-serif", padding: "1rem" }}>
                <h1>Vertical Tabs Demo</h1>
                <Tabs>
                    <div label="Gator">See ya later, <em>Alligator</em>!</div>
                    <div label="Croc">After 'while, <em>Crocodile</em>!</div>
                    <div label="Sarcosuchus">Nothing to see here, this tab is <em>extinct</em>!</div>
                    <div label="Snake">Don’t get bit by a <em>Python</em>!</div>
                    <div label="Turtle">Slow and steady wins the <em>race</em>!</div>
                    <div label="Dino">Roar of the <em>Dinosaur</em>!</div>
                </Tabs>
            </div>
        );
    }
}

export default App;
