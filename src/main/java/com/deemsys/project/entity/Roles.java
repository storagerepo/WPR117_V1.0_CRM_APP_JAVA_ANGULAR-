package com.deemsys.project.entity;

// Generated 6 Mar, 2017 4:52:52 PM by Hibernate Tools 3.4.0.CR1

import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * Roles generated by hbm2java
 */
@Entity
@Table(name = "roles", catalog = "CRM")
public class Roles implements java.io.Serializable {

	private Integer roleId;
	private String role;
	private Integer status;
	private Set<Users> userses = new HashSet<Users>(0);

	public Roles() {
	}

	public Roles(String role, Integer status, Set<Users> userses) {
		this.role = role;
		this.status = status;
		this.userses = userses;
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "role_id", unique = true, nullable = false)
	public Integer getRoleId() {
		return this.roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

	@Column(name = "role", length = 45)
	public String getRole() {
		return this.role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	@Column(name = "status")
	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "roles")
	public Set<Users> getUserses() {
		return this.userses;
	}

	public void setUserses(Set<Users> userses) {
		this.userses = userses;
	}

}
