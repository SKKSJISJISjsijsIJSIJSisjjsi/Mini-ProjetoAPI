import express from 'express';
import alunoModel from '../controllers/controllerAlunos.js';

const router = express.Router();

router.post('/', alunoModel.criarCadastro);
router.get('/', alunoModel.buscarCadastro);
router.get('/status/:status', alunoModel.buscarCadastroPorStatus);
router.get('/data/:data', alunoModel.buscarCadastroPorData);
router.get('/filtro', alunoModel.filtrarCadastro);
router.get('/:id', alunoModel.buscarCadastroPorId);
router.put('/:id', alunoModel.atualizarCadastro);
router.delete('/:id', alunoModel.deletarCadastro);

export default router;