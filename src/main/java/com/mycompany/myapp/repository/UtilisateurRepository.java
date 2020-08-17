package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Utilisateur;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Utilisateur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    @Query("select u FROM Utilisateur u WHERE u.user.login = ?#{principal?.username}")
	Page<Utilisateur> findAllByUserIsCurrentUser(Pageable pageable);

}
