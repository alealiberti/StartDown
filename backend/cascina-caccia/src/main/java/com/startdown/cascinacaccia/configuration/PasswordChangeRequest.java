package com.startdown.cascinacaccia.configuration;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * This class represents a request to change a user's password.
 * It contains the old password and the new password to be set.
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PasswordChangeRequest {

    private String oldPassword;
    private String newPassword;
}
