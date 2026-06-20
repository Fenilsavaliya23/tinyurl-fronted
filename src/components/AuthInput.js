import React, { useState } from "react";
import { Eye, EyeSlash } from "iconsax-react";

function AuthInput({
  label,
  icon: Icon,
  error,
  iconPosition = "right",
  type,
  ...props
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordField = type === "password";
  const inputType = isPasswordField
    ? isPasswordVisible
      ? "text"
      : "password"
    : type;
  const iconClass = `auth-icon ${iconPosition === "left" ? "auth-icon-left" : "auth-icon-right"}`;

  return (
    <label className="auth-field">
      {label ? <span className="auth-label">{label}</span> : null}
      <div className="auth-input-wrap">
        <input
          className={`auth-input ${isPasswordField ? "auth-input--password" : ""} ${error ? "auth-input-error" : ""}`}
          aria-invalid={!!error}
          type={inputType}
          {...props}
        />
        {isPasswordField ? (
          <button
            type="button"
            className="auth-password-toggle"
            onClick={() => setIsPasswordVisible((current) => !current)}
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            title={isPasswordVisible ? "Hide password" : "Show password"}
          >
            {isPasswordVisible ? (
              <EyeSlash size={18} color="currentColor" />
            ) : (
              <Eye size={18} color="currentColor" />
            )}
          </button>
        ) : Icon ? (
          <div className={iconClass}>
            <Icon size={18} color="currentColor" />
          </div>
        ) : null}
      </div>
      {error ? <div className="field-error">{error}</div> : null}
    </label>
  );
}

export default AuthInput;
