package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.BoutiqueService;
import com.mycompany.myapp.domain.Boutique;
import com.mycompany.myapp.repository.BoutiqueRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Boutique}.
 */
@Service
@Transactional
public class BoutiqueServiceImpl implements BoutiqueService {

    private final Logger log = LoggerFactory.getLogger(BoutiqueServiceImpl.class);

    private final BoutiqueRepository boutiqueRepository;

    public BoutiqueServiceImpl(BoutiqueRepository boutiqueRepository) {
        this.boutiqueRepository = boutiqueRepository;
    }

    @Override
    public Boutique save(Boutique boutique) {
        log.debug("Request to save Boutique : {}", boutique);
        return boutiqueRepository.save(boutique);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Boutique> findAll(Pageable pageable) {
        log.debug("Request to get all Boutiques");
        return boutiqueRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Boutique> findOne(Long id) {
        log.debug("Request to get Boutique : {}", id);
        return boutiqueRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Boutique : {}", id);
        boutiqueRepository.deleteById(id);
    }
}
