package fr.istic.idm.model.mediasequence.visitors;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;

import fr.istic.idm.model.mediasequence.AlternativeMediaSequence;
import fr.istic.idm.model.mediasequence.MandatoryMediaSequence;
import fr.istic.idm.model.mediasequence.OptionalMediaSequence;

public abstract class VideoGenCompilerVisitor extends MediaSequenceVisitor {

	@Override
	public abstract void visit(AlternativeMediaSequence sequence) throws FileNotFoundException;

	@Override
	public abstract void visit(OptionalMediaSequence sequence) throws FileNotFoundException;

	@Override
	public abstract void visit(MandatoryMediaSequence sequence) throws FileNotFoundException;
	/**
	 * Build The Video Compiled from the .videogen file and return an instance of File that points to it.
	 * @return
	 * @throws IOException 
	 */
	public abstract File build() throws IOException;

}
