import React, { useState, useRef } from 'react';
import Recdal from 'recdal';

import Button from '../../../components/Button';
import { Form, Input } from '../../../components/Form';
import { Container, TableWrapper, ModalContent } from './styles';

const Channels = () => {
	const formRef = useRef(null);
	const modalRef = useRef(null);

	const [creatingChannel, setCreatingChannel] = useState(false);

	const handleCreateUser = async ({ name }) => {
		try {
			if (!name) {
				throw { validationError: true };
			}

			modalRef.current.lock();
			setCreatingChannel(true);

			setTimeout(() => {
				modalRef.current.unlock();
				modalRef.current.close();
				setCreatingChannel(false);
			}, 1000);
		} catch (error) {
			console.error(error);

			if (error.validationError) {
				return formRef.current.setFieldError('name', 'Informe o nome do Cliente');
			}
		}
	};

	const handleOpenModal = () => modalRef.current.open();
	const handleCloseModal = () => {
		modalRef.current.close();
		formRef.current.reset();
	};

	return (
		<>
			<Container>
				<header>
					<h1>Canais</h1>
					<Button onClick={handleOpenModal}>Novo Canal</Button>
				</header>

				<TableWrapper></TableWrapper>
			</Container>

			<Recdal ref={modalRef} onSubmit={handleCreateUser}>
				<ModalContent>
					<h1>Novo Canal</h1>

					<Form ref={formRef} onSubmit={handleCreateUser}>
						<Input size={4} name='name' label='Nome do Canal' />

						<div className='buttons'>
							<Button
								disabled={creatingChannel}
								variant='outlined'
								type='button'
								onClick={handleCloseModal}>
								Cancelar
							</Button>
							<Button loading={creatingChannel} type='submit'>
								Criar Canal
							</Button>
						</div>
					</Form>
				</ModalContent>
			</Recdal>
		</>
	);
};

export default Channels;
