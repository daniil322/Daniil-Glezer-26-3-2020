import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Switch from "@material-ui/core/Switch";
import { useSelector, useDispatch } from "react-redux";
import { StoreState } from "../common/state";
import { toggleTheme, toggleUnit } from "../actions/weather-action";
import { ThemeColors, MeasureUnit, ScreenSize } from "../common/types";
import Drawer from "@material-ui/core/Drawer";
import { getCurrentTheme } from "../services/utils";

const NavBar = () => {
  const { theme, unit } = useSelector((state: StoreState) => state);
  const [drawer, setDrawer] = useState(false);
  const dispatch = useDispatch();

  const toggleThemeMode = () => {
    dispatch(
      toggleTheme(
        theme === ThemeColors.Light ? ThemeColors.Dark : ThemeColors.Light
      )
    );
  };

  const toggleUnits = () => {
    dispatch(
      toggleUnit(unit === MeasureUnit.C ? MeasureUnit.F : MeasureUnit.C)
    );
  };

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  const unitSwitch = (isUnitChecked: boolean) => {
    return (
      <div className="nav-option flex align-center justify-center">
        {MeasureUnit.F}
        <Switch
          color="default"
          checked={isUnitChecked}
          onChange={toggleUnits}
        />
        {MeasureUnit.C}
      </div>
    );
  };

  const navLinks = (darkTheme: string) => {
    return (
      <div className="flex nav-link-container justify-center">
        <NavLink
          activeClassName={"active"}
          className={`nav-option ${darkTheme}`}
          to="/"
          exact
        >
          Home
        </NavLink>
        <NavLink
          activeClassName={"active"}
          className={`nav-option ${darkTheme}`}
          to="/Favorites"
          exact
        >
          Favorites
        </NavLink>
      </div>
    );
  };

  const themeSwitch = (isThemeChecked: boolean) => {
    return (
      <div className="nav-option flex align-center justify-center">
        {ThemeColors.Dark}
        <Switch
          color="default"
          checked={isThemeChecked}
          onChange={toggleThemeMode}
        />
        {ThemeColors.Light}
      </div>
    );
  };
  const isThemeChecked = theme === ThemeColors.Light;
  const isUnitChecked = unit === MeasureUnit.C;
  const darkTheme = theme === "light" ? "" : ThemeColors.Dark;
  return drawer ? (
    <div className="flex  nav-container">
      <Drawer anchor={"right"} open={drawer} onClose={() => toggleDrawer()}>
        <div
          className={`flex align-center nav-content ${getCurrentTheme(
            theme
          )} text-center`}
        >
          {navLinks(darkTheme)}
          {unitSwitch(isUnitChecked)}
          {themeSwitch(isThemeChecked)}
        </div>
      </Drawer>
    </div>
  ) : window.innerWidth > ScreenSize.Phone ? (
    <div className="flex  nav-container">
      <div className="flex align-center space-between nav-content">
        {unitSwitch(isUnitChecked)}
        {navLinks("")}
        {themeSwitch(isThemeChecked)}
      </div>
    </div>
  ) : (
    <div
      onClick={() => setDrawer(true)}
      className="nav-container flex flex-end"
    >
      ☰
    </div>
  );
};

export default NavBar;
