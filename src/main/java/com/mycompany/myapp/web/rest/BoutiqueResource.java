package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Boutique;
import com.mycompany.myapp.service.BoutiqueService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Boutique}.
 */
@RestController
@RequestMapping("/api")
public class BoutiqueResource {

    private final Logger log = LoggerFactory.getLogger(BoutiqueResource.class);

    private static final String ENTITY_NAME = "boutique";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BoutiqueService boutiqueService;

    public BoutiqueResource(BoutiqueService boutiqueService) {
        this.boutiqueService = boutiqueService;
    }

    /**
     * {@code POST  /boutiques} : Create a new boutique.
     *
     * @param boutique the boutique to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new boutique, or with status {@code 400 (Bad Request)} if the boutique has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/boutiques")
    public ResponseEntity<Boutique> createBoutique(@Valid @RequestBody Boutique boutique) throws URISyntaxException {
        log.debug("REST request to save Boutique : {}", boutique);
        if (boutique.getId() != null) {
            throw new BadRequestAlertException("A new boutique cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Boutique result = boutiqueService.save(boutique);
        return ResponseEntity.created(new URI("/api/boutiques/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /boutiques} : Updates an existing boutique.
     *
     * @param boutique the boutique to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated boutique,
     * or with status {@code 400 (Bad Request)} if the boutique is not valid,
     * or with status {@code 500 (Internal Server Error)} if the boutique couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/boutiques")
    public ResponseEntity<Boutique> updateBoutique(@Valid @RequestBody Boutique boutique) throws URISyntaxException {
        log.debug("REST request to update Boutique : {}", boutique);
        if (boutique.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Boutique result = boutiqueService.save(boutique);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, boutique.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /boutiques} : get all the boutiques.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of boutiques in body.
     */
    @GetMapping("/boutiques")
    public ResponseEntity<List<Boutique>> getAllBoutiques(Pageable pageable) {
        log.debug("REST request to get a page of Boutiques");
        Page<Boutique> page = boutiqueService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /boutiques/:id} : get the "id" boutique.
     *
     * @param id the id of the boutique to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the boutique, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/boutiques/{id}")
    public ResponseEntity<Boutique> getBoutique(@PathVariable Long id) {
        log.debug("REST request to get Boutique : {}", id);
        Optional<Boutique> boutique = boutiqueService.findOne(id);
        return ResponseUtil.wrapOrNotFound(boutique);
    }

    /**
     * {@code DELETE  /boutiques/:id} : delete the "id" boutique.
     *
     * @param id the id of the boutique to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/boutiques/{id}")
    public ResponseEntity<Void> deleteBoutique(@PathVariable Long id) {
        log.debug("REST request to delete Boutique : {}", id);
        boutiqueService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
