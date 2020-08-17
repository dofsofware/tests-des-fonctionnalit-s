package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Boutique;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Boutique}.
 */
public interface BoutiqueService {

    /**
     * Save a boutique.
     *
     * @param boutique the entity to save.
     * @return the persisted entity.
     */
    Boutique save(Boutique boutique);

    /**
     * Get all the boutiques.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Boutique> findAll(Pageable pageable);


    /**
     * Get the "id" boutique.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Boutique> findOne(Long id);

    /**
     * Delete the "id" boutique.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
